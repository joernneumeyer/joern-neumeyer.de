main: main.m foo
	clang $(FLAGS) main.m Foo.o -o main.bin

foo: Foo.h Foo.m
	clang $(FLAGS) Foo.m -c -o Foo.o

clean:
	rm Foo.o main.bin main.d Foo.d
