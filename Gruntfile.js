module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
          dist: {
            src: ['dist/**/*', '!dist/.gitignore', 'coverage/**/*']
          }
        },

        copy: {
          distHtml: {
            files: [
              {expand: true, cwd: 'src/', src: ['**/*.html'], dest: 'dist/'}
            ]
          },
          public_assets: {
            files: [
              {expand: true, cwd: 'src/', src:['public/**/*.*', 'keys.json', '.keys.json'], dest: 'dist/'}
            ]
          }
        },

        sass: {
          dist: {
            files: [
              {'dist/css/styles.css': 'src/scss/styles.scss'},
              {
                expand: true,
                cwd: 'src/components',
                src: ['**/*.scss'],
                dest: 'dist/components',
                ext: '.css'
              }
            ],
          }
        },

        // use this to compile typescript - it uses the version of typescript compiler defined within this project, rather than any global typescript compiler
        ts: {
          default: {
            tsconfig: './tsconfig.json'
          }
        },

        watch: {
          options: {
            // spawn must be false for bsReload tasks to work correctly
            spawn: false
          },
          css: {
            files: ['src/scss/**/*.scss'],
            tasks: ['sass:dist', 'postcss:dist', 'bsReload:css']
          },
          typescript: {
            files: ['src/**/*.ts'],
            tasks: ['ts', 'bsReload:all']
          },
          html: {
            files: ['src/**/*.html'],
            tasks: ['copy:html', 'bsReload:all']
          },
          pug: {
            files: ['src/**/*.pug'],
            tasks: ['pug:compile', 'bsReload:all']
          }
        },

        bsReload: {
          css: {
            reload: "dist/css/styles.css"
          },
          all: {
            reload: true
          }
        },

        postcss: {
          options: {
            // no sourcemaps
            map: false,
            processors: [
              // add vendor prefixes
              require('autoprefixer')({browsers: 'last 2 versions'})
            ]
          },
          dist: {
            src: 'dist/**/*.css'
          }
        },

        pug: {
          compile: {
              options: {
                pretty: true
              },
              files: [{
                cwd: "src",
                src: ["**/*.pug", "!index.pug"],
                dest: "dist",
                expand: true,
                ext: ".html"
              },{
                cwd: "src",
                src: "index.pug",
                dest: "./",
                expand: true,
                ext: ".html"
              }]
          }
        }

    });

    // Load the plugin that provides the "clean" task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    // Load the plugin that provides the "watch" task.
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Load the plugin that provides the "copy" task.
    grunt.loadNpmTasks('grunt-contrib-copy');
    // Load the plugin that provides the "shell" task
    grunt.loadNpmTasks('grunt-shell');
    // Load the plugin that provides the "pug" task - used to compile jade template to html
    grunt.loadNpmTasks('grunt-contrib-pug');
    // Load the plugin that provides typescript compilation
    grunt.loadNpmTasks('grunt-ts');
    // Load the plugin for webpack
    grunt.loadNpmTasks('grunt-webpack');
    // Load the plugin to uglify Javascript
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // load our custom tasks
    //grunt.loadTasks('dev-tools/grunt/tasks');

    // Default task(s).
    grunt.registerTask('default', ['build', 'bs-dist']);
    grunt.registerTask('build', ['clean:dist', 'pug:compile', 'ts', 'copy:public_assets']);
    grunt.registerTask('bs-dist', ['browserSync:dist', 'watch']);

};
