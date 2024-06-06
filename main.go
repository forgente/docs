package main

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	args := os.Args
	if len(args) != 4 {
		fmt.Println("Please provide the path to the directory")
		return
	}
	srcDir := os.Args[1]
	if _, err := os.Stat(srcDir); os.IsNotExist(err) {
		fmt.Println("Src directory does not exist")
		return
	}
	dstDir := os.Args[2]
	err := os.MkdirAll(dstDir, os.ModePerm)
	if err != nil {
		fmt.Println("Dst directory does not exist")
		return
	}

	lang := os.Args[3]
	if lang == "" || (lang != "en-us" && lang != "zh-cn" && lang != "zh-tw" && lang != "de-de" && lang != "fr-fr") {
		fmt.Println("Please provide the language")
		return
	}

	err = filepath.Walk(srcDir, func(path string, info fs.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			fmt.Println("Directory: ", path)
		} else {
			if strings.HasSuffix(path, "."+lang+".md") {
				p := strings.Replace(path, "."+lang, "", 1)
				rPath, err := filepath.Rel(srcDir, p)
				if err != nil {
					return err
				}
				p = filepath.Join(dstDir, rPath)
				if err := os.MkdirAll(filepath.Dir(p), os.ModePerm); err != nil {
					return err
				}
				if err := os.Rename(path, p); err != nil {
					return err
				}
			}
		}
		return nil
	})
	if err != nil {
		fmt.Println(err)
	}
}
