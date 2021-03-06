import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSubmit(form: NgForm) {
    const loading = this.loadingController.create({
      content: 'Signing up...'
    });
    loading.present();
    this.authService.signUp(form.value.email, form.value.password)
      .then((res) => {
        console.log('res', res);
        loading.dismiss();
      })
      .catch(err => {
        console.log('err', err);
        loading.dismiss();
        const alert = this.alertController.create({
          title: 'SignUp Failed!',
          message: err.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

}
