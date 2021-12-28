from django.shortcuts import render
from django.http import JsonResponse
import numpy as np
# Create your views here.
def home_view(request):
    
    return render(request, "home.html")

def get_coords(request):
    result = request.GET.get('data', None)
    print(result)
    return JsonResponse({"backend_message": "Hello from backend dud"}, status=200)

def DCreator(G, LengthA, A, B, C, t):
    c=299792.458
    D=[[2*(G[0]-A[0]),2*(G[1]-B[0]),2*(G[2]-C[0]),+2*(c**2*(t[0]-G[3]))]]
    for i in range(1, LengthA):
        Df = []
        for j in range(i):
            Df.append(D[j])
        
        Df.append([2*(G[0]-A[i]),2*(G[1]-B[i]),2*(G[2]-C[i]), 2*(c**2*(t[i]-G[3]))])
        D = Df
    return np.array(D)

def FCreator(G,LengthA,A,B,C,t):
    c=299792.458

    F=[[(G[0]-A[0])**2+(G[1]-B[0])**2+(G[2]-C[0])**2-(c*(t[0]-G[3]))**2]]

    for i in range(1,LengthA):
        Ff = []
        for j in range(i):
            Ff.append(F[j])
        Ff.append([(G[0]-A[i])**2+(G[1]-B[i])**2+(G[2]-C[i])**2-(c*(t[i]-G[3]))**2])
        F = Ff
    return np.array(F)

def MVNewtonsInputs(Guess,A,B,C,t,LA):
    
    
    Gt = np.array([[Guess[0]], [Guess[1]], [Guess[2]], [Guess[3]]])
    c=299792.458;

    F=FCreator(Guess,LA,A,B,C,t)
    D=DCreator(Guess,LA,A,B,C,t)
    error = 1
    iterations =1
    while iterations < 10 :
        if D.shape[0] == D.shape[1]:
            Dinv = np.linalg.inv(D)
        else : 
            Dinv = np.linalg.inv(np.dot(D.T, D))
        V = np.dot(Dinv, -F)
        Gt = (Gt + V)
        F = FCreator(Gt.T[0],LA,A,B,C,t)
        D = DCreator(Gt.T[0],LA,A,B,C,t)
        error = np.amax(np.abs(F))
        iterations = iterations + 1
    
    return Guess

def sendData(req):
    # print(req.POST.get('data'))
    
    result = req.POST
    print(result)
    NOSATS = int(result.get('nosats'))
    A = []
    B = []
    C = []
    t = []
    for i in range(NOSATS):
        print("waaaaaaa")
        print(result.get('data[{}][X]'.format(i)))
        A.append(int(result.get('data[{}][X]'.format(i))))
        B.append(int(result.get('data[{}][Y]'.format(i))))
        C.append(int(result.get('data[{}][Z]'.format(i))))
        t.append(int(result.get('data[{}][T]'.format(i))))
    
    A = np.array(A)
    B = np.array(B)
    C = np.array(C)
    t = np.array(t)
    LA = A.size
    G = np.array([10,30,178,1000])
    Gt = np.array([[G[0]], [G[1]], [G[2]], [G[3]]])

    Gf = MVNewtonsInputs(G, A, B, C, t, LA)
    print(Gf)
    # D = DCreator(G, LA, A, B, C, t)
    # print(np.linalg.inv(D).shape)
    # F = FCreator(G, LA, A, B, C, t)
    # print(D)
    # print(np.dot(D,F))
    return JsonResponse({"instance": 123}, status=200)
