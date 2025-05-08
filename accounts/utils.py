

# def detectUser(user):
#       if user.role == 1:
#             redirecturl = 'vendorDashboard'
            
#       elif user.role == 2:
#             redirecturl = 'custDashboard'
#             return redirecturl
      
#       elif user.role == None and user.is_superadmin:
#             redirecturl ='/admin'
#             return redirecturl
      
def detectUser(user):
    if user.role == 1:
        return 'vendorDashboard'
    elif user.role == 2:
        return 'custDashboard'
    elif user.role is None and user.is_superadmin:
            redirecturl ='/admin'
            return redirecturl
      
