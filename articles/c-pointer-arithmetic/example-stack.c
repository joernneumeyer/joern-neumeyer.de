#include <stdio.h>

int main() {
  int a, c;
  int b = 4;
  a = 5;
  c = 6;
  printf("a@%d\r\nb@%d\r\nc@%d\r\n", (int)&a, (int)&b, (int)&c);
  // prints memory addresses like the following (depending on architecture):
  // a@-351270344
  // b@-351270352
  // c@-351270348
  return 0;
}
