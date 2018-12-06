import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TOASTR_TOKEN, Toastr } from '../events/common/toastr.service';

@Component ({
  templateUrl: './profile.component.html',
  styles: [`
    em: {float: right; color: #E05C65; padding-left: 10px;}
    .error input{background-color: #EC3C53;}
  `]
})

export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr) {
  }

  ngOnInit() {
    this.firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern(['a-zA-Z.*'])]);
    this.lastName = new FormControl(this.authService.currentUser.lastName, [Validators.required, Validators.pattern(['a-zA-Z.*'])]);

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }

  saveProfile(formValues) {
    if(this.profileForm.valid) {
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
      this.toastr.success('Profile saved');
    }
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.touched;
  }

  validateLastName() {
    return this.lastName.valid || this.lastName.touched;
  }

  cancel() {
    this.router.navigate(['events']);
  }
}
