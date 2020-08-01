import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationHelperService {

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  async presentAlertConfirm(message: string) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>'+ message + '</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Okay',
        }
      ]
    });

    await alert.present();
  }
  // Presenting a toast
  async presentToast(toastMessage: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 4000
    });
    toast.present();
  }

  // Presenting a progress bar
  async presentLoading(msg: string) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: msg,
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

    // Presenting a progress bar
    async presentLoadingForNomination() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Nominating User...',
        duration: 3000,
        spinner: 'bubbles',
        translucent: true
      });
      await loading.present();
    }
}
