import { Component, OnInit } from '@angular/core';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Login } from '../_class/login';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';
import { faExclamationCircle,faCheckCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements  OnInit {
lock=faLock
resetpassword=false;
updatepassword=false;
login:Login=new Login();
emailId:string;
otpfromui="";
otpfromdb="";
otp: string[] = ['', '', '', '','',''];
digits = [0, 1, 2, 3,4,5]; // Add more if needed
success=faCheckCircle
error=faExclamationCircle;
constructor(private loginService:LoginService,private router:Router){}
 ngOnInit(): void {

   this.loginService.canAuthenticate()
 }
getUserNow(){
 this.getUser()
}

getUser(){
 
  this.loginService.forgotUser(this.login.emailId).subscribe((data)=>{
      
    if(data.status==200){
      this.otpfromdb=data.body
      this.emailId=this.login.emailId
      $('#modalId1').show();
    }
  })
}


onInput(event: Event, index: number): void {
  const input = event.target as HTMLInputElement;
  if (input.value && index < this.digits.length - 1) {
    const nextInput = document.querySelectorAll<HTMLInputElement>('.otp-digit')[index + 1];
    nextInput.focus();
  }
}

onKeyDown(event: KeyboardEvent, index: number): void {
  if (event.key === 'Backspace' && !this.otp[index] && index > 0) {
    const prevInput = document.querySelectorAll<HTMLInputElement>('.otp-digit')[index - 1];
    prevInput.focus();
  }
}
checkotp(){
let i;
for( i=0;i<this.otp.length;i++){
  if(this.otp.length<=6)
this.otpfromui+=this.otp[i];
}
if(this.otpfromui==this.otpfromdb){
  $('#modalId1').hide();
  $('modalId2').show();
}
  

}
resetNow(){
  if(this.login.password!=this.login.confirmPassword){
    $('#statusErrorsModal').show();
  }else{
     this.updateUser()
  }
}
updateUser(){
this.loginService.updateUser(this.emailId,this.login).subscribe((data)=>{
  if(data.status==200){
    $('#statussuccesssModal').show();
  }
})
}

closeModel(){
  $('#statusErrorsModal').hide();
 }
 onBackTopassword(){

  $('#modalId').hide();
 }
 sucessModel(){
  $('#statussuccesssModal').hide();
  this.router.navigate(['/signin'])
 }
}
