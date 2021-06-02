import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { first, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

import { CoreConfigService } from "@core/services/config.service";

import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "app/auth/service/authentication.service";
import { toInteger } from "@ng-bootstrap/ng-bootstrap/util/util";

@Component({
  selector: "app-auth-register-v2",
  templateUrl: "./auth-register-v2.component.html",
  styleUrls: ["./auth-register-v2.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AuthRegisterV2Component implements OnInit {
  // Public
  public userNameVar;
  public emailVar;
  public passwordVar;
  public coreConfig: any;
  public passwordTextType: boolean;
  public registerForm: FormGroup;
  public submitted = false;
  public returnUrl: string;
  public error = "";
  public loading = false;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        menu: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        customizer: false,
        enableLocalStorage: false,
      },
    };
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  // convenience getter for easy access to form fields
  get form() {
    return this.registerForm.controls;
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.coreConfig = config;
      });
    // register form
    this.registerForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  onSubmit(event) {
    // stop here if form is invalid
    this.submitted = true;
    console.log(this.emailVar);
    if (this.registerForm.invalid) {
      console.log("invalidform");
      return;
    }
    this.loading = true;
    console.log(this.form);
    this._authenticationService
      .register(
        this.form.username.value,
        this.form.email.value,
        this.form.password.value
      )
      .subscribe(
        (data) => {
          if (data.success != 1) {
            this.loading = false;
            this.error = data.message;
          } else {
            this.loading = false;
            this._authenticationService.login(
              this.form.email.value,
              this.form.password.value
            ).pipe(first())
            .subscribe(
              data => {
                this._router.navigate([this.returnUrl]);
                window.location.reload()
              },
              error => {
                this.error = error;
                this.loading = false;
              }
            );
          }
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
