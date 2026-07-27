"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CategoriesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
let CategoriesService = CategoriesService_1 = class CategoriesService {
    categoryRepository;
    logger = new common_1.Logger(CategoriesService_1.name);
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(createCategoryDto) {
        const existingCategory = await this.categoryRepository.findOne({
            where: { slug: createCategoryDto.slug },
        });
        if (existingCategory) {
            throw new common_1.ConflictException('Category with this slug already exists');
        }
        const category = this.categoryRepository.create(createCategoryDto);
        const savedCategory = await this.categoryRepository.save(category);
        return savedCategory;
    }
    async findAll(page = 1, limit = 20) {
        const [categories, total] = await this.categoryRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { name: 'ASC' },
        });
        return {
            data: categories,
            page,
            size: limit,
            total,
        };
    }
    async findOne(id) {
        const category = await this.categoryRepository.findOne({
            where: { id },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async findBySlug(slug) {
        const category = await this.categoryRepository.findOne({
            where: { slug },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        const category = await this.findOne(id);
        if (updateCategoryDto.slug && updateCategoryDto.slug !== category.slug) {
            const existingCategory = await this.categoryRepository.findOne({
                where: { slug: updateCategoryDto.slug },
            });
            if (existingCategory) {
                throw new common_1.ConflictException('Category with this slug already exists');
            }
        }
        Object.assign(category, updateCategoryDto);
        const updatedCategory = await this.categoryRepository.save(category);
        return updatedCategory;
    }
    async remove(id) {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        await this.categoryRepository.delete(id);
    }
    async incrementEventCount(categoryId) {
        await this.categoryRepository.increment({ id: categoryId }, 'eventCount', 1);
    }
    async decrementEventCount(categoryId) {
        await this.categoryRepository.decrement({ id: categoryId }, 'eventCount', 1);
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = CategoriesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map