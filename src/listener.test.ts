import { ListenerHolder } from './listener';

type EventType = 'open' | 'close';
type EventListener = (num: number, str: string) => void;

const mockListener1 = jest.fn();
const mockListener2 = jest.fn();

let holder: ListenerHolder<EventType, EventListener>;

describe('ListenerHolder', () => {
    beforeEach(() => {
        holder = new ListenerHolder();
        mockListener1.mockClear();
        mockListener2.mockClear();
    });

    it('should dispatch event to given type', () => {
        holder.addListener('open', mockListener1);
        holder.addListener('close', mockListener2);
        holder.dispatch('open', 1, 'str');

        expect(mockListener1).toHaveBeenCalledTimes(1);
        expect(mockListener1).toHaveBeenCalledWith(1, 'str');
        expect(mockListener2).toHaveBeenCalledTimes(0);
    });
});
