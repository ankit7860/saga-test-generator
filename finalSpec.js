import { put, take } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';


    test('hiAnkit', assert => {
    const gen = cloneableGenerator(hiAnkit)();
    
    gen.next();  // "doStuff1"    
    gen.next();  // "doStuff2"    
});

    test('hiiiiiii', assert => {
    const gen = cloneableGenerator(hiiiiiii)();
    
    gen.next();  // "doStuff3"    
    gen.next();  // "doStuff4"    
    gen.next();  // "doStuff5"    
});

    test('generatorFuncExpress', assert => {
    const gen = cloneableGenerator(generatorFuncExpress)();
    
});

    test('generatorFuncDeclar', assert => {
    const gen = cloneableGenerator(generatorFuncDeclar)();
    
});

    test('fetchEntity', assert => {
    const gen = cloneableGenerator(fetchEntity)();
    
    gen.next();  //     
});

    test('loadUser', assert => {
    const gen = cloneableGenerator(loadUser)();
    
});

    test('loadRepo', assert => {
    const gen = cloneableGenerator(loadRepo)();
    
});

    test('loadStarred', assert => {
    const gen = cloneableGenerator(loadStarred)();
    
});

    test('loadStargazers', assert => {
    const gen = cloneableGenerator(loadStargazers)();
    
});

    test('watchNavigate', assert => {
    const gen = cloneableGenerator(watchNavigate)();
    
});

    test('watchLoadUserPage', assert => {
    const gen = cloneableGenerator(watchLoadUserPage)();
    
});

    test('watchLoadRepoPage', assert => {
    const gen = cloneableGenerator(watchLoadRepoPage)();
    
});

    test('watchLoadMoreStarred', assert => {
    const gen = cloneableGenerator(watchLoadMoreStarred)();
    
});

    test('watchLoadMoreStargazers', assert => {
    const gen = cloneableGenerator(watchLoadMoreStargazers)();
    
});

    test('root', assert => {
    const gen = cloneableGenerator(root)();
    
    gen.next();     
    gen.next();     
    gen.next();     
    gen.next();     
});
