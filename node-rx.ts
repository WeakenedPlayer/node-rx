import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';

import { 
    combineReducers,
    Reducer,
    Dispatcher,
    Action,
    State,
    Store
} from './store';

import {
    Actions,
    EffectsSubscription
} from './effects';


export class NodeRx<T> {
    private static initialReducerFactory( reducer ) {
        if (typeof reducer === 'function') {
          return reducer;
        }
        return combineReducers( reducer );
    }
    
    private static initialStateFactory( initialState, reducer ) {
        if (!initialState) {
          return reducer(undefined, { type: Dispatcher.INIT });
        }
        return initialState;
    }
    
    private static storeFactory(dispatcher, reducer, state$ ) {
        return new Store( dispatcher, reducer, state$ );
    }

    public store: Store<T>;
    public effectSubscription: EffectsSubscription;
    public actions: Actions;
    
    private state: State<T>;
    private dispatcher: Dispatcher;
    private reducer: Reducer;
    
    constructor( initialReducer: any, initialState: any, effectsInstance?: any[] ) {
        let INITIAL_REDUCER = NodeRx.initialReducerFactory( initialReducer );
        let INITIAL_STATE = NodeRx.initialStateFactory( initialState, INITIAL_REDUCER );

        this.dispatcher = new Dispatcher();
        this.reducer =new Reducer( this.dispatcher, INITIAL_REDUCER );
        this.state = new State( INITIAL_STATE, this.dispatcher, this.reducer );
        this.store = NodeRx.storeFactory( this.dispatcher, this.reducer, this.state );

        // effects
        this.actions = new Actions( this.dispatcher );
        this.effectSubscription = new EffectsSubscription( this.store, null, effectsInstance );      // no parent
    }
}

