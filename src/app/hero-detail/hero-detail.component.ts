import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  id: number;
  hero: Hero;
  heroes: Hero[];
  private sub: any;
  constructor(
    private heroeService: HeroService,
    private route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.heroeService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
    this.sub = this.route.params.subscribe(
      (params) => (this.id = +params['id'])
    );
    this.hero = this.heroes.find((hero) => hero.id === this.id);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  goBack() {
    this._location.back();
  }
}
