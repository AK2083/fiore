import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusButtonComponent } from './status-button.component';

describe('IconButtonComponent', () => {
    let component: StatusButtonComponent
    let fixture: ComponentFixture<StatusButtonComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [StatusButtonComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(StatusButtonComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should emit returnIdentifier event with type when emitEvent is called', () => {
        spyOn(component.returnIdentifier, 'emit');
        const testType = 'test-type';
        component.type = testType;
        component.emitEvent();
        expect(component.returnIdentifier.emit).toHaveBeenCalledWith(testType);
    });

    it('should emit pressButton event when Enter or Space key is pressed', () => {
        spyOn(component.returnIdentifier, 'emit');
        const testType = 'test-type';
        component.type = testType;

        const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
        component.onKeyDown(enterEvent);
        expect(component.returnIdentifier.emit).toHaveBeenCalledWith(testType);

        const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
        component.onKeyDown(spaceEvent);
        expect(component.returnIdentifier.emit).toHaveBeenCalledWith(testType);
    });

    it('should not emit pressButton event when another key is pressed', () => {
        spyOn(component.returnIdentifier, 'emit');

        const otherEvent = new KeyboardEvent('keydown', { key: 'A' });
        component.onKeyDown(otherEvent);
        expect(component.returnIdentifier.emit).not.toHaveBeenCalled();
    });
});