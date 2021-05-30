import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';

import { UserEditService } from 'app/main/apps/user/user-edit/user-edit.service';
import { profile } from 'node:console';
import { Product, Profil, User } from 'app/auth/models';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserEditComponent implements OnInit {
  // Public
  public url = this.router.url;
  public urlLastValue;
  public rows;
  profil : Profil;
  user : User

  public birthDateOptions: FlatpickrOptions = {
    altInput: true
  };

  public selectMultiLanguages = ['English', 'Spanish', 'French', 'Russian', 'German', 'Arabic', 'Sanskrit'];
  public selectMultiLanguagesSelected = [];

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {UserEditService} _userEditService
   */
  constructor(private router: Router, private _userEditService: UserEditService) {
    this._unsubscribeAll = new Subject();
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  updateUser(){
    this.rows.forEach(row => {
      if(row.id == this.urlLastValue){
        this.profil = new Profil()
        this.profil.id = row.id
        this.profil.firstName = row.firstName
        this.profil.lastName = row.lastName
        this.user = new User()
        this.user.id = row.user.id
        this.user.status = row.user.status
        this.user.roles = [{"role":row.user.roles[0].role}]
        this.user.email = row.user.email
        this.profil.user = this.user
        this._userEditService.updateUserAdd(row.id,this.profil)
        console.log(this.profil)

      }
    });
    
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this._userEditService.onDataChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.rows = response;
    });
  }
}
