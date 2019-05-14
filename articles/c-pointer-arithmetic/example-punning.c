#include <stdio.h>

typedef struct {
  float x, y, z;
} vector3_t;
// the following code will show some type punning examples
int main() {
  float a = 4;
  int a_as_int = *((int*)(&a));
  printf("the float %f as an int is %d\r\n", a, a_as_int);
  vector3_t some_vec = { 4.0f, 23.4f, -7.3f };
  float* vec_as_array = (float*)(&some_vec);
  printf("The vector values are %f:%f:%f\r\n", vec_as_array[0], vec_as_array[1], vec_as_array[2]);
  return 0;
}
