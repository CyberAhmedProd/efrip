import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { User } from 'app/auth/models';
import { UserService } from 'app/auth/service';

@Component({
  selector: 'app-new-user-sidebar',
  templateUrl: './new-user-sidebar.component.html'
})
export class NewUserSidebarComponent implements OnInit {
  _user : User
  _passwordTextType: boolean;
  _userForm : FormGroup;
  _statusList : any = ['active','inactive','pending'];
  _roleList : any = ['Client','Admin','Shipping'];
  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(private _coreSidebarService: CoreSidebarService, private _fb : FormBuilder, private _userService : UserService) {}


  get username(){
    return this._userForm.get('username').value
  }
  get email(){
    return this._userForm.get('email').value
  }
  get password(){
    return this._userForm.get('password').value
  }
  get role(){
    return this._userForm.get('role').value
  }
  get status(){
    return this._userForm.get('status').value
  }

  togglePasswordTextType() {
    this._passwordTextType = !this._passwordTextType;
  }
  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /**
   * Submit
   *
   * @param form
   */
  submit(form) {
    if (form.valid) {
      this.addUser()
      this.toggleSidebar('new-user-sidebar');
    }
  }

  private addUser(){
    this._user = new User();
    this._user.username = this.email
    this._user.password = this.password
    this._user.email = this.email
    this._user.roles = [{"role":this.role}]
    this._user.status = this.status
    this._userService.addUser(this._user);
    console.log(this._user)

  }

  ngOnInit(): void {
    this._userForm = this._fb.group({
      role:[null],
      status: [null],
      rank:[null],
      username:[null],
      email:[null],
      password : [null]
    });
  }
}
