import { put, take } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

<% _(funcs).each(function(func) { %>
    test('<%= func.name%>', assert => {
    const gen = cloneableGenerator(<%=func.name%>)();
    <% _(func.expressions).each(function(expression) { %>
    gen.next(); <% if(expression.argument.arguments[0].callee) { %> // <%= JSON.stringify(expression.argument.arguments[0].callee.name)%><%}%>    <% }) %>
});
<% }) %>