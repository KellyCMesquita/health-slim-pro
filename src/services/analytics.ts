/**
 * Analytics Service
 * Serviço para tracking de eventos
 */

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

export class AnalyticsService {
  track(event: AnalyticsEvent) {
    // TODO: Implementar integração com Google Analytics, Mixpanel, etc
    console.log('Analytics event:', event);
    
    // Exemplo com Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.name, event.properties);
    }
  }

  pageView(url: string) {
    this.track({
      name: 'page_view',
      properties: { page_path: url }
    });
  }

  userAction(action: string, category: string, label?: string) {
    this.track({
      name: action,
      properties: {
        event_category: category,
        event_label: label
      }
    });
  }
}

export const analyticsService = new AnalyticsService();
