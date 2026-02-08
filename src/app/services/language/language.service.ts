import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

export type SupportedLanguage = 'en' | 'fr' | 'ja' | 'gu';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: SupportedLanguage = 'en';
  readonly supportedLanguages: SupportedLanguage[] = ['en', 'fr', 'ja', 'gu'];

  constructor(
    public translateService: TranslateService,
    private location: Location,
  ) {}

  private normalizeLanguage(input: string | undefined | null): SupportedLanguage {
    const raw = (input || '').toLowerCase().trim();
    const code = raw.split('-')[0] as SupportedLanguage;
    return this.supportedLanguages.includes(code) ? code : 'en';
  }

  private getLanguageFromUrl(): SupportedLanguage | null {
    const rawPath = (this.location.path() || '').replace(/^\//, '');
    if (!rawPath) return null;
    const firstSegment = rawPath.split('/')[0];
    const lang = this.normalizeLanguage(firstSegment);
    return firstSegment === lang ? lang : null;
  }

  private setUrlLanguage(language: SupportedLanguage) {
    const rawPath = (this.location.path() || '').replace(/^\//, '');
    const segments = rawPath ? rawPath.split('/') : [];

    const currentFirst = segments[0];
    const currentLang = this.supportedLanguages.includes(currentFirst as SupportedLanguage)
      ? (currentFirst as SupportedLanguage)
      : null;

    const rest = currentLang ? segments.slice(1) : segments;
    const nextPath = [language, ...rest].filter(Boolean).join('/');
    this.location.go(nextPath);
  }

  initLanguage(){
    this.translateService.addLangs(this.supportedLanguages);
    this.translateService.setDefaultLang('en');

    const fromUrl = this.getLanguageFromUrl();
    const fromBrowser = this.normalizeLanguage(navigator.language || (navigator as any).userLanguage);
    const language = fromUrl ?? fromBrowser ?? 'en';

    this.translateService.use(language);
    this.setUrlLanguage(language);
    this.language = language;
  }

  changeLanguage(language){
    const next = this.normalizeLanguage(language);
    // Force reload to avoid stale cached translation JSON when switching languages
    // (useful especially with service worker / long-lived sessions)
    this.translateService.reloadLang(next).subscribe({
      next: () => {
        this.translateService.use(next);
        this.setUrlLanguage(next);
        this.language = next;
      },
      error: () => {
        // Fallback: still switch language even if reload fails
        this.translateService.use(next);
        this.setUrlLanguage(next);
        this.language = next;
      }
    });
  }
}
