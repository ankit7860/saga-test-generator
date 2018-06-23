// const acorn = require('acorn');
const fs = require('fs');

// will give list of all generator methods.
const esprima = require('esprima');
const _ = require('underscore');
var code = fs.readFileSync('sample.js', { encoding: 'utf-8'});
var syntax = esprima.parse(code, { sourceType: 'module'});
fs.writeFileSync('jsonTree.json', JSON.stringify(syntax));

var funcs = [];
_.each(syntax.body, function(i) {
    if (i.type == 'FunctionDeclaration' && i.generator == true) {
        var func = {name: i.id.name};
        func.expressions = [];
        _.each(i.body.body, function(j) {
            if (j.type == 'ExpressionStatement' && j.expression.type == "YieldExpression") {
                func.expressions.push(j.expression);
            }
        });

        funcs.push(func);
    } else if (i.type == 'VariableDeclaration') {
    // if (i.type == 'VariableDeclaration') {
        _.each(i.declarations, function(j) {
            if (j.init.type == 'FunctionExpression' && j.init.generator == true) {
                var func = {name: j.id.name};
                func.expressions = [];
                _.each(j.init.body.body, function(expressions) {
                    if (expressions.type == 'ExpressionStatement' && expressions.expression.type == "YieldExpression") {
                        func.expressions.push(expressions.expression);
                    }
                });
                funcs.push(func);
            }
        });
    } else if (i.type == 'ExportDefaultDeclaration') {
        // if (i.type == 'ExportDefaultDeclaration') {
            if (i.declaration.type == 'FunctionDeclaration' && i.declaration.generator == true) {
                var func = {name: i.declaration.id.name};
                func.expressions = [];
                _.each(i.declaration.body.body, function(expressions) {
                    if (expressions.type == 'ExpressionStatement' && expressions.expression.type == "YieldExpression") {
                        func.expressions.push(expressions.expression);
                    }
                });
                funcs.push(func);
                console.log(funcs);
        }
    }
});

// console.log(funcs);
fs.writeFileSync('funcs.json', JSON.stringify(funcs));
var testTemplate = fs.readFileSync('testTemplate.js');
var testContent = '';
testContentString = JSON.stringify(testContent);
fs.writeFileSync('saga-spec.js', JSON.parse(testContentString));
// console.log(testContentString);
var tpl = fs.readFileSync('testTemplate.js', 'utf-8');
var initTemplate = _.template(tpl);
// console.log(funcs);
var finalTpl = initTemplate({funcs : funcs});
// console.log(finalTpl);
fs.writeFileSync('finalSpec.js', finalTpl);