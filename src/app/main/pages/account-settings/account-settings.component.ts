import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';

import { AccountSettingsService } from 'app/main/pages/account-settings/account-settings.service';
import { Image, Profil } from 'app/auth/models';
import { ImageService, ProfilService } from 'app/auth/service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { local_image } from 'app/image.const'
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountSettingsComponent implements OnInit {
  // public
  _countryList : any = ['Tunisia','Alegria','Marroco'];
  public contentHeader: object;
  public data: Profil;
  img :any
  _country : any;
  public birthDateOptions: FlatpickrOptions = {
    altInput: true
  };
  public passwordTextTypeOld = false;
  public passwordTextTypeNew = false;
  public passwordTextTypeRetype = false;
  form: FormGroup;
  // private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {AccountSettingsService} _accountSettingsService
   * @param {ImageService} _imageService
   */
  constructor(private _profilService : ProfilService ,private _accountSettingsService: AccountSettingsService , private _imageService : ImageService,private fb: FormBuilder) {
    this._unsubscribeAll = new Subject();
    this.form = this.fb.group({
      img: [null]
    })
  }
  currentInput:any;
  currentOutput : any
  _imgData : Image
  onFileSelected(event) {
    console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.img = event.target.result;
          this.currentOutput = event.target.files[0];
      }
      reader.readAsDataURL(event.target.files[0]);
      
      const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      img: file
    });
    this.form.get('img').updateValueAndValidity()
    }
  }

   async uploadImg(){
    this._imgData = new Image();
    this._imgData.id = this.data.avatar.id;
    this._imgData.image = this.form.get('img').value;
    this._imgData.title = this.form.get('img').value.type
    console.log(this._imageService.updateImage(this._imgData))
    
  }

  updateProfilUser(){
    console.log(this.data)
    this._profilService.updateProfil(this.data.id,this.data)
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Password Text Type Old
   */
  togglePasswordTextTypeOld() {
    this.passwordTextTypeOld = !this.passwordTextTypeOld;
  }

  /**
   * Toggle Password Text Type New
   */
  togglePasswordTextTypeNew() {
    this.passwordTextTypeNew = !this.passwordTextTypeNew;
  }

  /**
   * Toggle Password Text Type Retype
   */
  togglePasswordTextTypeRetype() {
    this.passwordTextTypeRetype = !this.passwordTextTypeRetype;
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this._accountSettingsService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.data = response;
      if(this.data.avatar.image)
        this.img = 'data:image/png;base64,'+this.data.avatar.image.data
      else
        this.img = 'data:image/png;base64,'+local_image
    });

    // content header
    this.contentHeader = {
      headerTitle: 'Account Settings',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Pages',
            isLink: true,
            link: '/'
          },
          {
            name: 'Account Settings',
            isLink: false
          }
        ]
      }
    };
  }
}
