import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FavoritesService } from '../../services/favorites-service/favorites.service';

@Component({
  standalone: true,
  selector: 'app-favorites-component',
  templateUrl: './favorites.component.html',
  imports: [
    CommonModule
  ],
  styleUrls: ['./favorites.component.scss']
})
export class AppFavoritesComponent implements OnInit {
  favorites$: Observable<Map<number, string>>;

  constructor(private router: Router, private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favorites$ = this.favoritesService.favorites$.asObservable();
  }

  viewPhoto(id: number): void {
    void this.router.navigate([`/photos/${id}`]);
  }
}
