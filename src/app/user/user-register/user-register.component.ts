import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/services/user-service.service';
import * as alertyfy from 'alertifyjs';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
    selector: 'app-user-register',
    templateUrl: './user-register.component.html',
    styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

    registerationForm!: FormGroup;
    user!: User;
    userSubmitted!: boolean;

    constructor(private fb: FormBuilder,
        private userService: UserServiceService,
        private alertify: AlertifyService) { }

    ngOnInit() {
        //  this.registerationForm = new FormGroup({
        //  userName: new FormControl(null, Validators.required),
        //  email: new FormControl(null ,[Validators.required, Validators.email]),
        //  password: new FormControl(null,[Validators.required, Validators.minLength(8)]),
        // confirmPassword: new FormControl(null,[Validators.required]),
        // mobile: new FormControl(null,[Validators.required, Validators.maxLength(10)]),
        // });
        this.createRegisterationForm();
    }
    createRegisterationForm() {
        this.registerationForm = this.fb.group({
            userName: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(8)]],
            confirmPassword: [null, Validators.required],
            mobile: [null, [Validators.required, Validators.maxLength(10)]]
        }, { validators: this.passwordMatchingValidator });
        //{Validators: this.passwordMatchingValidator}
    }

    // DODJE DO OVDE I IZBACUJE DA NE MOZE DA DODJE SA mozda da se doda setTimeout
    // CITANJEM KOD  POVRATNE INFORMACIJE POREDJENJA ZA PW
    passwordMatchingValidator(fg: FormGroup): Validators {
        return fg.get('password')?.value === fg.get('confirmPassword')?.value
        { notmatched: true };
    }


    onsubmit() {
        console.log(this.registerationForm.value);
        this.userSubmitted = true;
        if (this.registerationForm.valid) {
            // this.user =  Object.assign(this.user, this.registerationForm.value);
            this.userService.addUser(this.userData());
            this.registerationForm.reset();
            this.userSubmitted = false;
            this.alertify.success('Congrats, you are successfully registered');
        } else {
            this.alertify.error('Kindly provide the required fields');
        }
    }

    userData(): User {
        return this.user = {
            userName: this.userName.value,
            email: this.email.value,
            password: this.password.value,
            mobile: this.mobile.value
        }
    }


    get userName() {
        return this.registerationForm.get('userName') as FormControl;
    }
    get email() {
        return this.registerationForm.get('email') as FormControl;
    }
    get password() {
        return this.registerationForm.get('password') as FormControl;
    }
    get confirmPassword() {
        return this.registerationForm.get('confirmPassword') as FormControl;
    }
    get mobile() {
        return this.registerationForm.get('mobile') as FormControl;
    }


}