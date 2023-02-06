import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { auditTime, filter, fromEvent, Observable, tap, zip } from 'rxjs';
import { PhotoService } from '../../services/photos-service/photos-service.service';

@Component({
  standalone: true,
  selector: 'app-gallery-component',
  templateUrl: './gallery.component.html',
  imports: [
    CommonModule
  ],
  styleUrls: ['./gallery.component.scss']
})
export class AppGalleryComponent implements OnInit {
  photoUrls$: Observable<string>[] = [];
  isLoading: boolean = false;

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    fromEvent(window, 'scroll').pipe(
      auditTime(150),
      filter(() => (window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.isLoading),
      tap(() => this.loadPhotos())
    ).subscribe();

    this.loadPhotos(16);
  }

  loadPhotos(count: number = 8) {
    this.isLoading = true;
    this.photoService.getPhotosUrls(count).subscribe(photos => {
      this.photoUrls$.push(...photos);
      zip(this.photoUrls$).subscribe(() => this.isLoading = false);
    });
  }

  showPhoto(event: Event) {
    (event.currentTarget as HTMLElement).classList.add('photo-loaded');
  }
}
