import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gif';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private serviceUrl = 'https://api.giphy.com/v1/gifs/search';
  private apiKey: string = 'wNMaiT7UYQI5GZDAX5MCHwdBNBpjy0zm';
  private _history: string[] = [];
  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }
  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(sessionStorage.getItem('images')!) || [];
  }

  getGifs(search: string = '') {
    search = search.trim().toLowerCase();

    this._history.unshift(search);
    this._history = this._history.splice(0, 10);
    this._history = [...new Set(this._history)];
    localStorage.setItem('history', JSON.stringify(this._history));
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', search);

    this.http
      .get<SearchGifsResponse>(`${this.serviceUrl}`, { params })
      .subscribe((resp) => {
      
        this.results = resp.data;
        sessionStorage.setItem('images', JSON.stringify(this.results));
      });
  }
}
