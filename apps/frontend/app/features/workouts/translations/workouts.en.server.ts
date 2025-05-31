export default {
  'date {{date}} full test': 'Short {date, date, full}',
  'date {{date}} short test': 'Short {date, date, short}',
  'nested test {{gender}} {{count}}': `
		{
			gender, select,
			female {{
				count, plural,
					=0 {Ela não capturou nenhum}
					one {Ela tem capturado um só}
				other {Ela tem capturado #}
			}}
			other {{
				count, plural,
					=0 {Ele não capturou nenhum}
					one {Ele tem capturado um só}
				other {Ele tem capturado #}
			}}
		}
	`,
  parent: {
    'nested {{value}}': 'Nested {value}',
  },
  'plural {{number}} test': 'Plural {number, plural, one {ONE} other {OTHER}} test',
  'select {{value}} test': 'Select {value, select, foo {FOO} buz {BUZ} other {OTHER}} test',
} as const;
