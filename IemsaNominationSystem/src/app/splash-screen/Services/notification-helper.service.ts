import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationHelperService {

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    private progressController: LoadingController
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
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
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
  async presentLoading(loadingMessage: string) {
    const loading = await this.progressController.create({
      message: loadingMessage,
      duration: 4000,
      translucent: true,
      showBackdrop: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
}
