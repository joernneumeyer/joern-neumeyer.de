main: main.m Foo.o
	clang $(FLAGS) main.m Foo.o -o main

foo: Foo.h Foo.m
	clang $(FLAGS) Foo.m -c -o Foo.o
