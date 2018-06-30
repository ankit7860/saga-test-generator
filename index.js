const fs = require('fs');
const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');
const _ = require('underscore');
const fileName = 'sample.js';

console.log('starting..............');

// generating AST tree for the required file
const fileTreeGenerator = (fileName) => {
  const fileContent = fs.readFileSync(fileName, { encoding: 'utf-8' });
  fs.writeFileSync('jsonTree.json', JSON.stringify(fileContent));
  return esprima.parse(fileContent, { sourceType: 'module' })
}

// getting all the generator functions
const generatorFunctionExtractor = (asTree) => {
  let result = [];
  estraverse.traverse(asTree, {
    enter: (node) => (((node.init && node.init.generator && node.type == 'VariableDeclarator') || (node.generator && node.type == 'FunctionDeclaration')) && result.push(node))
  });
  return result;
}

// convert tree to js Code if required
const expressionToJsConvertor = (node) =>  escodegen.generate(node)

// getting yield expression tree and yield expression params
const yieldExpressionExtractor = (asTree) => {
  let result = [];
  estraverse.traverse(asTree, {
    enter: (node) => {
      let expressionCodes = [];
      if (node.type == 'YieldExpression') {
        expressionCodes.push(expressionToJsConvertor(node.argument));
        result.push({'node': node, 'expressionCode': expressionCodes})
      }
    }
  });
  return result;
}

const generateTest = function(fileName) {
  let fileTree = fileTreeGenerator(fileName);
  fs.writeFileSync('jsonTree.json', JSON.stringify(fileTree));
  let generators = generatorFunctionExtractor(fileTree);
  
  let yields = []; 
  _.each(generators, function (generator) {
    yields.push({'name': (generator.id)? generator.id.name : 'defalut','yieldExpressions': yieldExpressionExtractor(generator)});
  })
  
  fs.writeFileSync('generatorsDetails.json', JSON.stringify(yields));
  
  var tpl = fs.readFileSync('testTemplate.js', 'utf-8');
  var initTemplate = _.template(tpl);
  var finalTpl = initTemplate({yields});
  fs.writeFileSync('finalSpec.js', finalTpl);
}


fs.readdirSync('./').forEach(file => {
  // put condition to check your required files
  if (file === '') {
   generateTest(file)
 }
})



// we can use node-glob to get list of all the files
// var glob = require("glob")

// options is optional
// glob("**/*.js", options, function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
// })