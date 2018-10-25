import { SharedRootingModule } from './shared-rooting.module';

describe('SharedRootingModule', () => {
  let sharedRootingModule: SharedRootingModule;

  beforeEach(() => {
    sharedRootingModule = new SharedRootingModule();
  });

  it('should create an instance', () => {
    expect(sharedRootingModule).toBeTruthy();
  });
});
