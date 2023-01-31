import { LightningElement, track } from 'lwc';
export default class Demo extends LightningElement {
    showContent = false
    showButton = false
    arr = ["Kalpesh", "Shubham", "Akash"]
    get fullName(){
        return this.arr[2]
    }
    
    //@track profile = {
    profile = {
        name: "Kalpesh",
        phone: 7798699244
    }
    changeHandler(event){
        //this.profile.name = event.target.value
        this.profile = {...this.profile, "name":event.target.value}
    }

    handleClickShow(){
        this.showContent = true
        this.showButton = true
    }

    handleClickClose(){
        this.showContent = false
        this.showButton = false
    }
}