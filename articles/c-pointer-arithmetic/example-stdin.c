#include <stdio.h>

int main() {
  int age;

  printf("Please enter your age: ");
  scanf("%d", &age);
  if (age > 17) {
    printf("You're old enough.\r\n");
  } else {
    printf("Please come back in %d years and try again.\r\n", age);
  }

  return 0;
}
