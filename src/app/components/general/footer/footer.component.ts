import { Component, OnInit, AfterViewInit } from '@angular/core';
import { trigger, query, stagger, animate, style, transition } from '@angular/animations'
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { SOCIAL_LINKS, SOCIAL_MAILTO, SOCIAL_TEL } from 'src/app/config/social-links';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    animations: [
        trigger("animateFooter", [
            transition(":enter", [
                query("*", [
                    style({ opacity: 0, transform: "translateY(100%)" }),
                    stagger(50, [
                        animate("250ms cubic-bezier(0.35, 0, 0.25, 1)", style({ opacity: 1, transform: "none" }))
                    ])
                ])
            ])
        ])
    ],
    standalone: false
})
export class FooterComponent implements OnInit {
  public readonly emailMailto = SOCIAL_MAILTO;
  public readonly emailText = SOCIAL_LINKS.email;
  public readonly linkedinUrl = SOCIAL_LINKS.linkedin;
  public readonly phoneTel = SOCIAL_TEL;
  public readonly phoneText = SOCIAL_LINKS.phone;

  constructor(
    public analyticsService: AnalyticsService
  ) { }

  ngOnInit(): void {
  }

}
