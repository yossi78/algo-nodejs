
class AuthGuard {

    private user;

    constructor(user) {
      this.user = user;
    }
  
    canAccess(resource) {
      console.log(`Checking access for: ${this.user.name} (Role: ${this.user.role})...`);
  
      if (this.user.role === 'admin') {
        console.log("Result: Access Granted!");
        return true;
      }
  
      console.log("Result: Access Denied!");
      return false;
    }
  }
  
  async function main() {
    console.log("--- Starting Security Audit Test ---");
  
    const adminUser = { name: "Alice", role: "admin" };
    const guestUser = { name: "Bob", role: "guest" };
    const target = "Admin_Dashboard";
  
    // בדיקה 1: משתמש מורשה
    const guard1 = new AuthGuard(adminUser);
    if (guard1.canAccess(target)) {
      console.log("Success: Admin has entered.");
    } else {
      console.log("Failure: Access should have been granted.");
    }
  
    console.log("------------------------------------");
  
    // בדיקה 2: משתמש לא מורשה
    const guard2 = new AuthGuard(guestUser);
    if (guard2.canAccess(target)) {
      console.log("Success: Should not have happened!");
    } else {
      console.log("Blocked: Guest access attempt correctly rejected.");
    }
  
    console.log("--- End of Test ---");
  }
  
  main();
