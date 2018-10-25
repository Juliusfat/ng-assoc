import { EventRootingModule } from './event-rooting.module';

describe('EventRootingModule', () => {
  let eventRootingModule: EventRootingModule;

  beforeEach(() => {
    eventRootingModule = new EventRootingModule();
  });

  it('should create an instance', () => {
    expect(eventRootingModule).toBeTruthy();
  });
});
