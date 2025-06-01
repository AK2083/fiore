import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconButtonComponent } from './icon-button.component';

describe('IconButtonComponent', () => {
    let component: IconButtonComponent;
    let fixture: ComponentFixture<IconButtonComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [IconButtonComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(IconButtonComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should return srText if set, otherwise return default value', () => {
        component.srText = 'Test Titel';
        expect(component.safeSRText).toBe('Test Titel');

        component.srText = null;
        expect(component.safeSRText).toBe('Allgemeiner Titel');
    });

    it('should emit pressButton event when emitEvent is called', () => {
        spyOn(component.pressButton, 'emit');

        component.emitEvent(true);
        expect(component.pressButton.emit).toHaveBeenCalledWith(true);

        component.emitEvent(false);
        expect(component.pressButton.emit).toHaveBeenCalledWith(false);
    });

    it('should emit pressButton event when Enter or Space key is pressed', () => {
        spyOn(component.pressButton, 'emit');

        const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
        component.onKeyDown(enterEvent);
        expect(component.pressButton.emit).toHaveBeenCalledWith(true);

        const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
        component.onKeyDown(spaceEvent);
        expect(component.pressButton.emit).toHaveBeenCalledWith(true);
    });

    it('should not emit pressButton event when another key is pressed', () => {
        spyOn(component.pressButton, 'emit');

        const otherEvent = new KeyboardEvent('keydown', { key: 'A' });
        component.onKeyDown(otherEvent);
        expect(component.pressButton.emit).not.toHaveBeenCalled();
    });
});