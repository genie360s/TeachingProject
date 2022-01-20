import {getAuth} from "firebase/auth";
import {makeAutoObservable} from "mobx";

export class SignInDetails {
    public id: String | null;
    public isSignedIn: Boolean;
    public isLoaded: Boolean
    public token: String | null

    constructor() {
        makeAutoObservable(this);
        const auth = getAuth();

        setTimeout(() => {
            if (this.isLoaded && this.id != null) {
                getAuth().currentUser?.getIdToken().then((token) => {
                    this.token = token;
                })
            }
        }, 120000);

        auth.onAuthStateChanged((user) => {
            this.updateState(user?.uid)
        });
    }

    SignOut = () => {
        return getAuth().signOut();
    }

    async updateState(user: string | undefined) {
        this.isLoaded = true;
        if (user) {
            this.id = user
            this.token = await getAuth().currentUser?.getIdToken()!
            // TODO: remove this once we create institute
            //this.id = "2010"
            this.isSignedIn = true;
            console.log("uid => " + this.id + "\n islogged in => " + this.isSignedIn);
        } else {
            this.isSignedIn = false;
            this.id = null;
        }
    }
}
