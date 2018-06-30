
    describe('when testing fetchPosts', () => {
        
        it('should return required result', ()=> {
            const next = generator.next().value;
            const action = put(actions.requestPosts());
            expect(next).toEqual(action);
        })
        
        it('should return required result', ()=> {
            const next = generator.next().value;
            const action = call(fetchApi, '/products');
            expect(next).toEqual(action);
        })
        
        it('should return required result', ()=> {
            const next = generator.next().value;
            const action = put(actions.receivePosts(products));
            expect(next).toEqual(action);
        })
        
    }


