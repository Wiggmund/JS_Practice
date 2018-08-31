'use strict';

/*
	Побольшой части это конспект книги Шаблоны JavaScript, а точнее некоторых сложных или трудно запоминающихся моментов
*/

{ // Паттерны классического наследования
	function inherit( Parent, Child ) {
		Child.prototype = new Parent();
	}

	inherit( Numbers, PatternOne );

	function Numbers( numbers ) {
		this.numbers = numbers || [1, 2, 3];
	}

	Numbers.prototype.show = function () {
		console.log( this.numbers );
	};

	function PatternOne( numbers ) {}


	function PatternTwo( numbers ) {
		Numbers.apply( this, arguments )
	}


	function PatternThree( numbers ) {
		Numbers.apply( this, arguments );
	}
	PatternThree.prototype = new Numbers();


	function PatternFour( numbers ) {
		this.numbers = 'Numbers of Four constructor';
	}
	PatternFour.prototype = Numbers.prototype;


	function TempConstructor() {}
	TempConstructor.prototype = Numbers.prototype;


	function PatternFive( numbers ) {
		this.numbers = 'Numbers of Five constructor';
	}
	PatternFive.prototype = new TempConstructor();
	PatternFive.uber = Number.prototype;
	PatternFive.prototype.constructor = PatternFive;


	// var x = new PatternOne();
	// var y = new PatternTwo();
	// var z = new PatternThree();
	// var g = new PatternFour();
	// var t = new PatternFive();

	// console.log( x.hasOwnProperty( 'numbers' ) );
	// console.log( y.hasOwnProperty( 'numbers' ) );
	// console.log( z.hasOwnProperty( 'numbers' ) );
	// z.show()
	// delete z.numbers;
	// z.show()
	// console.log( z.hasOwnProperty( 'numbers' ) );
	// t.show();
	// console.log( t.numbers );
	// delete t.numbers;
	// console.log( t.numbers );
}

{ // Constructor of constants " Объкт-констант "
	var constant = (function () {
		var constants = {},
				ownProp = Object.prototype.hasOwnProperty,
				allowed = {
					string: 1,
					number: 1,
					boolean: 1
				},
				prefix = ( Math.random() + '_' ).slice(2);

		return {
			set: function ( name, value ) {
				if ( this.isDefined( name ) ) {
					console.log( 'Impossible, the constant has already exist' );
				}

				if ( !ownProp.call( allowed, typeof value ) ) {
					console.log( 'Invalid type of value' );
				}

				constants[prefix + name] = value;

				return true;
			},
			isDefined: function( name ) {
				if ( ownProp.call( constants, prefix + name ) ) {
					return true;
				}

				return false;
			},
			get: function ( name ) {
				if ( this.isDefined( name ) ) {
					return constants[prefix + name];
				}

				return null;
			}
		};
	})();

	// console.log( constant.isDefined( 'myVal' ) );

	// constant.set( 'myVal', 100 );

	// console.log( constant.isDefined( 'myVal' ) );
	// console.log( constant.get( 'myVal' ) );
}

{ // Realizing "method()"
	
	/*
		'method( имя_нового_метода, его_реализация(функция) )' это грубо-говоря метод который определяет методы для экземпляров конструктора и добавляет их в его прототип 
	*/

	var Person = function( name ) {
		this.name;
	}.
		method( 'getName', function() {
			return this.name;
		}).
		method( 'seName', function( userName ) {
			this.name = userName;

			return this;
		});

	function method( name, realizing ) {
		if ( typeof Function.prototype.method !== 'function' ) {
			Function.prototype.method = function() {
				this.prototype[name] = realizing;
				return this;
			};
		}
	}
}

{ // Универсальная ф-ция для наследования

	var inherit = (function () {
		var Func = function () {}; // Промежуточная ф-ция или конструктор, поскольку именно конструктор этой ф-ции будет использоваться

		/*
			Чтобы избавиться от необходимости создавать временный(промежуточный) конструктор всякий раз, когда нужно организовать наследования, то вполне достаточно сосдать его однажды и просто изменять его свойство 'prototype'. Для этой цели можно использовать немедленно вызываемую ф-цию и сохрнаять промежуточную ф-цию в замыкании 
		*/

		return function ( Child, Parent ) {
			Func.prototype = Parent.prototype;
			Child.prototype = new Func();
			Child.uber = Parent.prototype; // Сохранение " Супер класса "
			Child.prototype.constructor = Child; // Сохраняем конструктор экземпляра, в противном случае будет констуктор 'Parent'
		};
	})();
}

{ // Реализция ф-ции 'klass', которая имитирует классы в JavaScript
	var klass = function ( Parent, props ) {

		var Child, F, i;

		Child = function () {
			if ( Child.uber && Child.uber.hasOwnProperty( "__construct" ) ) {
				Child.uber.__construct.apply( this, arguments );
			}

			if ( Child.prototype.hasOwnProperty( "__construct" ) ) {
				Child.prototype.__construct.apply( this, arguments );
			}
		};

			Parent = Parent || Object;
			var F = function () {};
			F.prototype = Parent.prototype;
			Child.prototype = new F();
			Child.uber = Parent.prototype;
			Child.prototype.constructor = Child;

			for ( let i in props ) {
				if ( props.hasOwnProperty( i ) ) {
					Child.prototype[ i ] = props[ i ];
				}
			}

			return Child;
	};

	var Human = klass( null, {
		__construct: function ( name ) {
			console.log( 'I am Human Constructor' );
			this.name = name;
		},
		getName: function () {
			return this.name;
		}
	});

	var Male = klass( Human, {
		__construct: function ( name ) {
			console.log( 'I am Male constructor' );
		},
		getName: function () {
			var name = Male.uber.getName.call( this );
			return `I am ${ name }`;
		}
	});

	// var x = new Human( 'Klark' );
	// console.log( x.getName() );
	// console.log( x );

	// var y = new Male( 'Yura' );
	// console.log( y.getName() );
	// console.log( y );
}

{ // Своя, отдаленная реализация ф-ции Object.create
	function objectCreate( Parent ) {
		var F = function () {};

		Parent = Parent || Object;
		F.prototype = Parent;

		return new F();
	}

	// var Parent = function ( name ) {
	// 	this.name = name;
	// };

	// var Child = objectCreate( Parent );
	// console.log( Child.__proto__ );
}

{ // Пример ф-ции поверхостного копирования объектов

	function extend( parent, child ) {
		var i;

		child = child || {};

		for ( i in parent ) {
			if ( parent.hasOwnProperty( i ) ) {
				child[i] = parent[i];
			}
		}

		return child;
	}

	/*
		Поскольку свойствами объекта могут быть другие объекты( массивы, ф-ции, объекты ), тоесть те члены, которые передаются по ссылке, а не копируются. То при поверхостном копирования они также передаются по ссылке дочерньому объекту, и при их изминении в доч. объекте они будут менятся в родительском. Чтобы этого избежать ф-ции нужно расширить и сделать чтобы она рекурсивно проходила вложенные объекты и копирувала их
	*/

	function extendDeep( parent, child ) {
		var i,
				toStr = Object.prototype.toString,
				arrStr = '[object Array]';

		child = child || {};

		for ( i in parent ) {
			if ( parent.hasOwnProperty( i ) ) {

				if ( typeof parent[i] === 'object' ) {
					child[i] = ( toStr.call( parent[i] ) === arrStr ) ? [] : {};
					extendDeep( parent[i], child[i] );
				} else {
					child[i] = parent[i];
				}
			}
		}

		return child;
	}

	// var dad = {
	// 	numbers: [1, 2, 3],
	// 	name: 'Father'
	// };

	// var son = extendDeep( dad );
	// console.log( son );

	// son.numbers.push(4, 5);
	// console.log( 'son', son );
	// console.log( 'dad', dad );

	// console.log( son.numbers === dad.numbers );
}

{ // Реализация ф-ции смешивания, когда копируется не один объект, а много

	function mix () {
		var arg, prop, Child = {};

		for ( arg = 0; arg <arguments.length; arg += 1 ) {
			for ( prop in arguments[arg] ) {
				if ( arguments[arg].hasOwnProperty( prop ) ) {
					Child[prop] = arguments[arg][prop];
				}
			}
		}

		return Child;
	}

	var cake = mix(
		{eggs: 2, large: true},
		{butter: 1, salted: true},
		{flour: "3 cups"},
		{sugar: true}
	);

	console.dir( cake );
}

{ // Реализация ф-ции bind()

	function bind( object, method ) {
		return function () {
			return method.apply( object )
		};
	}

	/*
		Полноценная реализация ф-ции
	*/

	if ( typeof Function.prototype.bind === undefined ) {
		Function.prototype.bind = function ( context ) {
			var fn = this,
					slice = Array.prototype.slice,
					args = slice.call( arguments, 1 ); // Фиксируются аргументы, но кроме первого, потому что первый аргумент это контекст

			return function () {
				return fn.apply( context, args.concat( slice.call( arguments ) ) ); //Здесь предусматраюется возможность, что кроме зафиксированных параметров будет передано еще
			};
		};
	}
}

/*
	-------------------Шаблоны проэктирования-------------------
*/

{ // Шаблон единственного объекта - "Singleton"
	/*
		Способ первый: Экземпляр в статическом свойстве конструктора

						Недостатки: статическое свойство является общедоступным для внешнего програмного кода
	*/
	{
		function Universe() {
			if ( typeof Universe.instance === 'object' ) {
				return Universe.instance;
			}

			this.start = 'Big Bang';

			Universe.instance = this;
		}

		// var uni1 = new Universe(),
		// 		uni2 = new Universe();

		// console.log( uni1 === uni2 );
	}

	/*
		Второй способ: переопределить конструктор
	*/

	{
		function Universe() {
			// Сохраненный экземпляр
			var instance;

			// Переопределить конструктор
			Universe = function () {
				return instance;
			};

			// Перенести свойства прототипа
			Universe.prototype = this;

			// Сосдать экземпляр
			instance = new Universe();

			// Переустановить указатель на коструктор
			instance.constructor = Universe;

			// Функциональность для экземпляра
			this.name = "The our Universe";

			return instance
		}

		// Universe.prototype.nothing = true;
		// var uni = new Universe();
		// Universe.prototype.everything = true;
		// var uni2 = new Universe();

		// console.log( uni === uni2 );
		// console.log( uni.nothing && uni.everything && uni2.nothing && uni2.everything );
		// console.log( uni.constructor === Universe );
	}

	/*
		Третий способ: Обернуть конструктор в немедленно вызываемую ф-цию
	*/

	{
		var Universe;

		(function () {
			var instance;

			Universe = function () {
				if ( instance ) {
					return instance;
				}

				instance = this;

				this.name = "Universe";

				return instance;
			};
		}());
	}
}

{ // Шаблон фабрика

	/*
		Назначения:
			1) Выполнения поворяющихся операция, необходимых при сосдании похожих объектов
			2) Предложить пользователям фабрики способ создания объектов без необходимости знать их тип( класс ) на этапе компиляции
	*/

	// Родительский конструктор
	function CarMaker() {};

	// Метод предка
	CarMaker.prototype.drive = function () {
		console.log( `I have ${ this.door } doors` );
	};

	// Статический фабричный метод
	CarMaker.factory = function ( type ) {
		var constr = type,
				newCar;

		// Сообщить об ошибке, если такой конструктор( аргумент type ) отсуствует
		if ( typeof CarMaker[constr] !== 'function' ) {
			throw {
				name: Error,
				message: `${ constr } doesn't exist` 
			};
		}

		// Здесь уже известно, что такой конструктор существует
		// поэтому определим отношения наследования с предком, но только один раз
		if ( typeof CarMaker[constr].prototype.drive !== 'function' ) {
			CarMaker[constr].prototype = new CarMaker();
		}

		// Сосдать новый экземпляр
		newCar = new CarMaker[constr]();

		// Возращаем готовый объект
		return newCar;
	};

	/* ------------Спецеализированные конструкторы------------ */
	CarMaker.Compact = function () {
		this.door = 4;
	};
	CarMaker.Extended = function () {
		this.door = 8;
	};
	CarMaker.BIG = function () {
		this.door = 16;
	};

	// var corolla = CarMaker.factory( 'Compact' );
	// var mercedes = CarMaker.factory( 'Extended' );
	// var bus = CarMaker.factory( 'BIG' );
	// corolla.drive();
	// mercedes.drive();
	// bus.drive();
}

{ // Шаблон итератор
	var agg = (function () {
		var index = 0,
				data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 2, 13, 1, 23, 12, 31, 23, 123, 1, 23],
				length = data.length;

		return {
			next: function () {
				var element;

				if ( !this.hasNext() ) {
					return null
				}

				element = data[index];
				index += 2;

				return element;
			},
			hasNext: function () {
				return index < length;
			},
			current: function () {
				return data[ index ];
			},
			reset: function () {
				index = 0;
				return true;
			}
		};
	}());

	// while ( agg.hasNext() ) {
	// 	console.log( agg.next() );
	// }
}

{ // Шаблон Декоратор

	/*
		// Способ 1: Реализация с помощью наследования
	*/

	{
		function Sale( price ) {
			this.price = price || 100;
		}

		Sale.prototype.getPrice = function () {
			return this.price;
		};

		Sale.decorators = {};

		Sale.decorators.bussinesTax = {
			getPrice: function () {
				var price = this.uber.getPrice();
				price += price * 5 / 100;
				return price;
			}
		};
		Sale.decorators.fedTax = {
			getPrice: function () {
				var price = this.uber.getPrice();
				price += price * 10 / 100;
				return price;
			}
		};

		Sale.prototype.decorate = function ( decorator ) {
			var F = function () {},
					overrides = this.constructor.decorators[decorator],
					i, newObj;

			F.prototype = this;
			newObj = new F();
			newObj.uber = F.prototype;

			for ( i in overrides ) {
				if ( overrides.hasOwnProperty( i ) ) {
					newObj[ i ] = overrides[ i ];
				}
			}

			return newObj;
		};
		// console.log( Sale.decorators )

		// var mySale = new Sale( 1000 );
		// console.log( mySale.getPrice() );
		// console.log( mySale );

		// mySale = mySale.decorate( 'bussinesTax' );
		// console.log( mySale.getPrice() );
		// console.log( mySale );

		// mySale = mySale.decorate( 'fedTax' );
		// console.log( mySale.getPrice() );
		// console.log( mySale );
	}

	/*
		Способ 2: Реализация с использованием списка
	*/

	{
		function Sale( price ) {
			this.price = price || 100;
			this.decorators_list = [];
		}

		Sale.decorators = {};

		Sale.decorators.bussinesTax = {
			getPrice: function ( price ) {
				return price += price * 5 / 100;
			}
		};
		Sale.decorators.fedTax = {
			getPrice: function ( price ) {
				return price += price * 10 / 100;
			}
		};

		Sale.prototype.getPrice = function () {
			var price = this.price,
					i,
					max = this.decorators_list.length,
					name;

			for ( i = 0; i < max; i += 1 ) {
				name = this.decorators_list[ i ];
				price = Sale.decorators[ name ].getPrice( price );
			}

			return price;
		};
	}
}

{ // Шаблон стратегия на примере проверки данных с формы
	var validator = {
		types: {},
		messages: [],
		config: {},
		validate: function ( data ) {
			var i, msg, type, checker, result_ok;

			this.messages = [];

			for ( i in data ) {

				if ( data.hasOwnProperty( i ) ) {

					type = this.config[i];
					checker = this.types[type];

					if ( !type ) {
						continue;
					}

					if ( !checker ) {
						throw {
							name: 'Validation Error',
							message: 'No handler to validate type ' + type
						};
					}

					result_ok = checker.validate( data[ i ] );
					if ( !result_ok ) {
						msg = "Invalid value for *" + i + "*, " + checker.instructions;
						this.messages.push( msg );
					}
				}
			}
			return this.hasErrors();
		},
		hasErrors: function () {
			return this.messages.length !== 0;
		}
	};

	validator.config = {
		first_name: 'isNonEmpty',
		age: 'isNumber',
		username: 'isAlphaNum'
	};

	validator.types.isNonEmpty = {
		validate: function ( value ) {
			return value !== "";
		},
		instructions: 'The value cannot be empty'
	};
	validator.types.isNumber = {
		validate: function ( value ) {
			return !isNaN( value );
		},
		instructions: 'The value cannot be not a number'
	};
	validator.types.isAlphaNum = {
		validate: function ( value ) {
			return !/[^a-z0-9]/i.test( value );
		},
		instructions: 'The value cannot be not a string'
	};


	var data = {
		first_name: 'Yura',
		last_name: 'Uchiha',
		age: 'unknown',
		username: 'o_O'
	};

	// validator.validate( data );
	// if ( validator.hasErrors() ) {
	// 	console.log( validator.messages.join( '\n' ) );
	// } 
}