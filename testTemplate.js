<% _(yields).each(function(yield) { %>
    describe('when testing <%= yield.name%>', () => {
        <% _(yield.yieldExpressions).each(function(yieldExpression) { %>
        it('should return required result', ()=> {
            const next = generator.next().value;
            const action = <%=yieldExpression.expressionCode%>;
            expect(next).toEqual(action);
        })
        <% }) %>
    }
<% }) %>

