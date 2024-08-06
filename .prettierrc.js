module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',
  importOrder: [
    '^react(-native)?$', // React and react-native stuff goes at the top
    '', // use empty strings to separate groups with empty lines
    '^react',
    '',
    '<THIRD_PARTY_MODULES>', // Third party modules (this is a plugin keyword)
    '',
    '^src/(.*)$',
    '',
    '^../(.*)$', // Local imports in parent directories
    '^./(.*)$', // Local imports in current directory
  ],
  importOrderSeparation: false, // turn this on to see the sorting groups.
  importOrderSortIndividualImports: true,
  importOrderMergeDuplicateImports: true,
  importOrderTypeImportsToTop: true, // Set this to false if you want type imports to be sorted with the rest of the imports
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: ['typescript', 'jsx'],
};
