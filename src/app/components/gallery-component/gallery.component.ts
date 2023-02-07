import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { auditTime, filter, finalize, forkJoin, fromEvent, Observable, take, tap, zip } from 'rxjs';
import { PhotoService } from '../../services/photos-service/photos.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FavoritesService } from '../../services/favorites-service/favorites.service';

@Component({
  standalone: true,
  selector: 'app-gallery-component',
  templateUrl: './gallery.component.html',
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  styleUrls: ['./gallery.component.scss']
})
export class AppGalleryComponent implements OnInit {
  photoUrls$: Observable<string>[] = [];
  isLoading: boolean = false;

  constructor(private photoService: PhotoService, private favoritesService: FavoritesService) {}

  ngOnInit() {
    const columnsCount = Math.floor(window.innerWidth / 220);
    const rowCount = Math.ceil(window.innerHeight / 300);

    this.loadPhotos(columnsCount * rowCount);

    fromEvent(window, 'scroll').pipe(
      auditTime(150),
      filter(() => (window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.isLoading),
      tap(() => this.loadPhotos(columnsCount))
    ).subscribe();
  }

  loadPhotos(count: number) {
    this.isLoading = true;
    this.photoService.getPhotosUrls(count)
      .subscribe(photos => {
        this.photoUrls$.push(...photos);
        forkJoin(this.photoUrls$).subscribe(() => this.isLoading = false)
      });
  }

  toggleFavorite(event: Event) {
    const photoUrl = (event.currentTarget as HTMLImageElement).src;
    this.favoritesService.toggleFavorite(photoUrl);
  }

  isFavorite(photoUrl: string | null) {
    return this.favoritesService.isFavorite(photoUrl ?? '');
  }

  showPhoto(event: Event) {
    const photoElem = event.currentTarget as HTMLImageElement;

    photoElem.classList.add('photo-loaded');
  }
}
