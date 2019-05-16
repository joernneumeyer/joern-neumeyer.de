#include <stdio.h>

int* get_referenced_int() {
  int a = 4;
  return &a;
}

int main() {
  int* a = get_referenced_int();
  printf("%d\r\n", *a);
  return 0;
}
