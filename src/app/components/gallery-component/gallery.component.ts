import { Component } from '@angular/core';
import { PhotoService } from '../../services/photos-service/photos-service.service';
import { delay, Observable } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-gallery-component',
  templateUrl: './gallery.component.html',
  imports: [
    AsyncPipe,
    NgForOf
  ],
  styleUrls: ['./gallery.component.scss']
})
export class AppGalleryComponent {
  photoUrls$: Observable<string>[] = [];

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.photoService.getPhotosUrls(3).subscribe(photos => {
      this.photoUrls$.push(...photos)
    });

    this.photoService.getPhotosUrls(3)
      .pipe(
        delay(1000)
      )
      .subscribe(photos => {
        this.photoUrls$.push(...photos);
        console.log(this.photoUrls$);
      });
  }
}
