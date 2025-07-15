import { Page, expect } from "@playwright/test"
import { TaskModel } from "../../../fixtures/task.model"

export class TaskPage{
    readonly page: Page

    constructor (page: Page) {
        this.page = page
    }

    async go(){
        await this.page.goto('http://localhost:8080')
    }

    async create(task: TaskModel) {
        const inputNewTask = this.page.locator('#newTask')
        await inputNewTask.fill(task.name)
        const btnCreate = this.page.locator('css=button >> text=Create')
        await btnCreate.click()
    }

    async shouldHaveText(taskName: string){
        //const target = page.getByTestId('task-item')
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`) // Crase (``): quando você precisar incluir variáveis dentro da string (interpolação de variáveis).
        await expect(target).toHaveText(taskName)
    }

    async alertHaveText(text: string){
        const inputNewTask = this.page.locator('#newTask')
        const btnCreate = this.page.locator('css=button >> text=Create')
        const msn_aviso = this.page.locator('#swal2-html-container')

        await expect(msn_aviso).toHaveText(text)
    }
}