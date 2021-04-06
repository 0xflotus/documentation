

Maven and Gradle compile Java class files seamlessly, but they might exclude some debugging symbols. This is done to reduce the binary size and make reverse engineering harder for distributed apps. 

To ensure these details are included, add a flag to the compiler. This flag has no impact on compiler optimization or performance, it only enhances the bytecode with additional debug information. 

### Maven

For Maven, add the following lines to the `pom.xml` file: 

``` {.xml}
    <compilerArgs>
    <arg>-g:source,lines</arg>
    </compilerArgs>
```

### Gradle

In the Gradle build file, ensure that the following properties are specified:

```
compileJava.options.debugOptions.debugLevel = "source,lines,vars"
compileTestJava.options.debugOptions.debugLevel = "source,lines,vars"
```
