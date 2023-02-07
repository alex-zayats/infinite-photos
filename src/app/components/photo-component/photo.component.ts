import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites-service/favorites.service';

@Component({
  standalone: true,
  selector: 'app-photo-component',
  templateUrl: './photo.component.html',
  imports: [
    CommonModule
  ],
  styleUrls: ['./photo.component.scss']
})
export class AppPhotoComponent implements OnInit {
  photoId: number | null;
  photoUrl: string;

  constructor(private route: ActivatedRoute, private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.photoId = Number(this.route.snapshot.paramMap.get('id'));
    this.photoUrl = this.favoritesService.getUrl(this.photoId);
  }

  removeFavorite(url: string) {
    this.favoritesService.removeFavorite(url);
  }
}
