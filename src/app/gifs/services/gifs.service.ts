import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gif';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'wNMaiT7UYQI5GZDAX5MCHwdBNBpjy0zm';
  private _history: string[] = [];
  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }
  constructor(private http: HttpClient) {}

  getGifs(search: string = '') {
    search = search.trim().toLowerCase();

    this._history.unshift(search);
    this._history = this._history.splice(0, 10);
    this._history = [...new Set(this._history)];
    console.log(this._history);
    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=wNMaiT7UYQI5GZDAX5MCHwdBNBpjy0zm&q=${search}&limit=10`
      )
      .subscribe((resp) => {
        console.log(resp.data);
        this.results = resp.data;
      });
  }
}
