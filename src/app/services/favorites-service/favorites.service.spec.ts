import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import any = jasmine.any;

describe('FavoritesService', () => {
  let service: FavoritesService;

  const dummyFavorites = new Map([[1, 'some-url-1'], [2, 'some-url-2']]);
  const dummyId = 111;
  const dummyUrl = 'some-url';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);

    service.favorites = dummyFavorites;
    spyOn<any>(service, 'getId').and.returnValue(dummyId);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initStorage', () => {
    it('should init "favorites" property', () => {
      spyOn(service, 'updateStorage');

      service.initStorage();

      expect(service.favorites).toEqual(dummyFavorites);
    });

    it('should call updateStorage', () => {
      spyOn(service, 'updateStorage');

      service.initStorage();

      expect(service.updateStorage).toHaveBeenCalled();
    });
  });

  describe('updateStorage', () => {
    it('should emit "favorites$" property', () => {
      spyOn(service.favorites$, 'next');

      service.updateStorage();

      expect(service.favorites$.next).toHaveBeenCalledWith(dummyFavorites);
    });

    it('should call setItem in localStorage', () => {
      spyOn(localStorage, 'setItem');

      service.updateStorage();

      expect(localStorage.setItem).toHaveBeenCalledWith('favorites', any(String));
    });
  });

  describe('addFavorite', () => {
    it('should set new "favorites" property', () => {
      spyOn(service.favorites, 'set');

      service.addFavorite(dummyUrl);

      expect(service.favorites.set).toHaveBeenCalledWith(dummyId, dummyUrl);
    });

    it('should call updateStorage', () => {
      spyOn(service, 'updateStorage');

      service.initStorage();

      expect(service.updateStorage).toHaveBeenCalled();
    });
  });

  describe('removeFavorite', () => {
    it('should delete "favorites" property', () => {
      spyOn(service.favorites, 'delete');

      service.removeFavorite(dummyUrl);

      expect(service.favorites.delete).toHaveBeenCalledWith(dummyId);
    });

    it('should call updateStorage', () => {
      spyOn(service, 'updateStorage');

      service.initStorage();

      expect(service.updateStorage).toHaveBeenCalled();
    });
  });

  describe('isFavorite', () => {
    it('should return true if url is favorite', () => {
      spyOn(service.favorites, 'has').and.returnValue(true);

      expect(service.isFavorite(dummyUrl)).toBeTruthy();
    });

    it('should return false if url is not favorite', () => {
      spyOn(service.favorites, 'has').and.returnValue(false);

      expect(service.isFavorite(dummyUrl)).toBeFalsy();
    });
  });
});
